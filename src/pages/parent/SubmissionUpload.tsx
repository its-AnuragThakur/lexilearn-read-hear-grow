import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LexiCard } from "@/components/ui/lexi-card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { ImageIcon, VideoIcon, Upload, CheckCircle2, X } from "lucide-react";

export default function SubmissionUpload() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const assignmentId = searchParams.get("assignmentId") || "";
  const assignmentName = searchParams.get("assignmentName") || "Assignment";
  const studentId = searchParams.get("studentId") || "";
  const studentName = searchParams.get("studentName") || "Student";

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast({
          title: "Wrong file type",
          description: "Please upload a JPG or PNG image.",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["video/mp4", "video/quicktime"].includes(file.type)) {
        toast({
          title: "Wrong file type",
          description: "Please upload an MP4 or MOV video.",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const uploadFile = async (
    file: File,
    folder: string,
    setProgress: React.Dispatch<React.SetStateAction<number>>
  ): Promise<string> => {
    const fileName = `${user?.id}/${studentId}/${assignmentId}/${folder}/${Date.now()}_${file.name}`;

    // Simulate progress since Supabase doesn't provide upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress = Math.min(progress + 10, 90);
      setProgress(progress);
    }, 200);

    const { data, error } = await supabase.storage
      .from("assignment-evidence")
      .upload(fileName, file);

    clearInterval(progressInterval);
    setProgress(100);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("assignment-evidence")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!imageFile || !videoFile || !user) {
      toast({
        title: "Missing files",
        description: "Please upload both an image and a video.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image
      const imageUrl = await uploadFile(imageFile, "images", setImageUploadProgress);

      // Upload video
      const videoUrl = await uploadFile(videoFile, "videos", setVideoUploadProgress);

      // Save submission record
      const { error: dbError } = await supabase
        .from("assignment_submissions")
        .insert({
          student_id: studentId,
          parent_id: user.id,
          assignment_id: assignmentId,
          assignment_name: assignmentName,
          image_url: imageUrl,
          video_url: videoUrl,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Your submission has been uploaded successfully.",
      });

      // Navigate to confirmation page
      navigate(
        `/parent/submission-confirmation?assignmentName=${encodeURIComponent(
          assignmentName
        )}&studentName=${encodeURIComponent(studentName)}`
      );
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = imageFile && videoFile && !isSubmitting;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Student Assignment Evidence
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Please upload proof of your child's completed work.
            <br />
            Both an image and a video are required.
          </p>
        </div>

        {/* Assignment Info */}
        <LexiCard className="p-6 bg-accent/30">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Assignment:</span> {assignmentName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Student:</span> {studentName}
            </p>
          </div>
        </LexiCard>

        {/* Image Upload Section */}
        <LexiCard className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Upload Image</h2>
              <p className="text-muted-foreground">
                Photo of student's written work (JPG or PNG)
              </p>
            </div>
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageSelect}
            className="hidden"
          />

          {!imagePreview ? (
            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-primary/40 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-colors"
            >
              <Upload className="h-10 w-10 text-primary/60" />
              <span className="text-lg text-muted-foreground">
                Click to select image
              </span>
            </button>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:opacity-80"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-background/90 px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Image ready</span>
              </div>
            </div>
          )}

          {isSubmitting && imageUploadProgress > 0 && imageUploadProgress < 100 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Uploading image... {imageUploadProgress}%
              </p>
              <Progress value={imageUploadProgress} className="h-2" />
            </div>
          )}
        </LexiCard>

        {/* Video Upload Section */}
        <LexiCard className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <VideoIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Upload Video</h2>
              <p className="text-muted-foreground">
                Video of student reciting or reading (MP4 or MOV)
              </p>
            </div>
          </div>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/quicktime"
            onChange={handleVideoSelect}
            className="hidden"
          />

          {!videoPreview ? (
            <button
              onClick={() => videoInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-primary/40 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-colors"
            >
              <Upload className="h-10 w-10 text-primary/60" />
              <span className="text-lg text-muted-foreground">
                Click to select video
              </span>
            </button>
          ) : (
            <div className="relative">
              <video
                src={videoPreview}
                controls
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={clearVideo}
                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:opacity-80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {isSubmitting && videoUploadProgress > 0 && videoUploadProgress < 100 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Uploading video... {videoUploadProgress}%
              </p>
              <Progress value={videoUploadProgress} className="h-2" />
            </div>
          )}
        </LexiCard>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="lg"
          className="w-full text-xl py-6"
        >
          {isSubmitting ? "Uploading..." : "Submit Evidence"}
        </Button>

        {!canSubmit && !isSubmitting && (
          <p className="text-center text-muted-foreground">
            Please upload both files to enable submission.
          </p>
        )}
      </div>
    </div>
  );
}
