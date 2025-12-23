import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Brain, Sparkles } from "lucide-react";

const assessmentQuestions = [
  {
    id: 1,
    category: "reading",
    question: "How does your child feel when reading long paragraphs?",
    options: [
      { value: "easy", label: "They find it easy and enjoyable" },
      { value: "moderate", label: "It takes some effort but they manage" },
      { value: "difficult", label: "They often lose their place or feel tired" },
      { value: "very_difficult", label: "They avoid reading long texts when possible" }
    ]
  },
  {
    id: 2,
    category: "reading",
    question: "Does your child mention that letters or words appear to move, blur, or swap places?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" }
    ]
  },
  {
    id: 3,
    category: "reading",
    question: "How comfortable is your child reading aloud?",
    options: [
      { value: "very_comfortable", label: "Very comfortable" },
      { value: "comfortable", label: "Comfortable with familiar texts" },
      { value: "uncomfortable", label: "They make mistakes and feel nervous" },
      { value: "avoid", label: "They try to avoid it" }
    ]
  },
  {
    id: 4,
    category: "spelling",
    question: "How often does your child mix up similar-looking letters (b/d, p/q)?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" }
    ]
  },
  {
    id: 5,
    category: "spelling",
    question: "When spelling, does your child sometimes write letters in the wrong order?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" }
    ]
  },
  {
    id: 6,
    category: "phonics",
    question: "How easy is it for your child to break words into syllables?",
    options: [
      { value: "very_easy", label: "Very easy" },
      { value: "easy", label: "Easy for most words" },
      { value: "difficult", label: "Difficult for longer words" },
      { value: "very_difficult", label: "They struggle with this" }
    ]
  },
  {
    id: 7,
    category: "phonics",
    question: "Can your child easily hear the difference between similar sounds (like 'bat' and 'pat')?",
    options: [
      { value: "always", label: "Yes, always" },
      { value: "usually", label: "Usually" },
      { value: "sometimes", label: "Sometimes they mix them up" },
      { value: "rarely", label: "They often have trouble" }
    ]
  },
  {
    id: 8,
    category: "memory",
    question: "How well does your child remember what they've just read?",
    options: [
      { value: "very_well", label: "Very well" },
      { value: "well", label: "Well, especially main ideas" },
      { value: "somewhat", label: "They often need to re-read" },
      { value: "poorly", label: "They frequently forget" }
    ]
  },
  {
    id: 9,
    category: "memory",
    question: "Does your child find it hard to remember sequences (like days of the week or months)?",
    options: [
      { value: "never", label: "No, they remember them easily" },
      { value: "rarely", label: "Rarely have trouble" },
      { value: "sometimes", label: "Sometimes need reminders" },
      { value: "often", label: "Yes, they often struggle" }
    ]
  },
  {
    id: 10,
    category: "attention",
    question: "How long can your child focus on reading before needing a break?",
    options: [
      { value: "long", label: "30+ minutes easily" },
      { value: "moderate", label: "15-30 minutes" },
      { value: "short", label: "5-15 minutes" },
      { value: "very_short", label: "Less than 5 minutes" }
    ]
  },
  {
    id: 11,
    category: "attention",
    question: "Is your child easily distracted by background noise while reading?",
    options: [
      { value: "never", label: "No, they can focus well" },
      { value: "rarely", label: "Only in very noisy places" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Yes, very easily" }
    ]
  },
  {
    id: 12,
    category: "visual",
    question: "Does bright white backgrounds make reading harder for your child?",
    options: [
      { value: "no", label: "No, white is fine" },
      { value: "slightly", label: "Slightly uncomfortable" },
      { value: "yes", label: "Yes, they prefer colored backgrounds" },
      { value: "strongly", label: "Yes, it causes strain or headaches" }
    ]
  },
  {
    id: 13,
    category: "visual",
    question: "Does your child find it helpful to use a ruler or finger to track lines while reading?",
    options: [
      { value: "not_needed", label: "They don't need it" },
      { value: "sometimes", label: "Sometimes helpful" },
      { value: "often", label: "Often helpful" },
      { value: "always", label: "Essential for them" }
    ]
  },
  {
    id: 14,
    category: "preferences",
    question: "What font size does your child prefer for comfortable reading?",
    options: [
      { value: "small", label: "Normal/Small (12-14px)" },
      { value: "medium", label: "Medium (16-18px)" },
      { value: "large", label: "Large (20-24px)" },
      { value: "very_large", label: "Very Large (26px+)" }
    ]
  },
  {
    id: 15,
    category: "preferences",
    question: "Does your child find extra spacing between letters and words helpful?",
    options: [
      { value: "no", label: "No, normal spacing is fine" },
      { value: "slightly", label: "Slightly more spacing helps" },
      { value: "yes", label: "Yes, more spacing helps a lot" },
      { value: "essential", label: "Yes, they need wide spacing" }
    ]
  },
  {
    id: 16,
    category: "learning_style",
    question: "How does your child learn new words best?",
    options: [
      { value: "visual", label: "Seeing them written down" },
      { value: "auditory", label: "Hearing them spoken" },
      { value: "kinesthetic", label: "Writing them out themselves" },
      { value: "mixed", label: "A combination of all" }
    ]
  },
  {
    id: 17,
    category: "learning_style",
    question: "Would your child benefit from lessons being read aloud?",
    options: [
      { value: "no", label: "No, they prefer reading themselves" },
      { value: "sometimes", label: "Sometimes, for difficult texts" },
      { value: "yes", label: "Yes, it helps them understand better" },
      { value: "always", label: "Yes, always" }
    ]
  },
  {
    id: 18,
    category: "support",
    question: "How much practice does your child need to remember new words?",
    options: [
      { value: "little", label: "1-2 times is enough" },
      { value: "moderate", label: "3-5 times" },
      { value: "more", label: "6-10 times" },
      { value: "extensive", label: "Many repetitions over days" }
    ]
  }
];

interface Props {
  studentId: string;
  studentName?: string;
  onComplete?: () => void;
}

export default function ParentAssessment({ studentId, studentName, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;
  const canProceed = responses[question.id] !== undefined;

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const learningProfile = generateLearningProfile(responses);

      const { error } = await supabase.from("student_assessments").upsert({
        student_id: studentId,
        responses,
        learning_profile: learningProfile,
        completed_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Assessment completed! Your child's personalized study plan is ready.");
      if (onComplete) {
        onComplete();
      } else {
        navigate("/parent");
      }
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("Failed to save assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateLearningProfile = (responses: Record<number, string>) => {
    const readingDifficulty = calculateDifficulty([1, 2, 3], responses);
    const spellingDifficulty = calculateDifficulty([4, 5], responses);
    const phonicsDifficulty = calculateDifficulty([6, 7], responses);
    const memoryDifficulty = calculateDifficulty([8, 9], responses);
    const attentionDifficulty = calculateDifficulty([10, 11], responses);
    const visualNeeds = calculateDifficulty([12, 13], responses);

    const fontSizePref = responses[14] || "medium";
    const spacingPref = responses[15] || "slightly";
    const learningStyle = responses[16] || "mixed";
    const ttsPreference = responses[17] || "sometimes";
    const repetitionNeed = responses[18] || "moderate";

    return {
      difficulties: {
        reading: readingDifficulty,
        spelling: spellingDifficulty,
        phonics: phonicsDifficulty,
        memory: memoryDifficulty,
        attention: attentionDifficulty,
        visual: visualNeeds,
      },
      preferences: {
        fontSize: fontSizePref,
        spacing: spacingPref,
        learningStyle,
        ttsPreference,
        repetitionNeed,
      },
      recommendations: {
        useTTS: ["yes", "always"].includes(ttsPreference),
        useReadingRuler: ["often", "always"].includes(responses[13] || ""),
        useColoredBackground: ["yes", "strongly"].includes(responses[12] || ""),
        lessonPace: attentionDifficulty > 2 ? "short" : "normal",
        focusAreas: getFocusAreas(readingDifficulty, spellingDifficulty, phonicsDifficulty),
      },
    };
  };

  const calculateDifficulty = (questionIds: number[], responses: Record<number, string>) => {
    const difficultyScores: Record<string, number> = {
      easy: 0, very_easy: 0, never: 0, very_comfortable: 0, very_well: 0, long: 0, no: 0, not_needed: 0, little: 0,
      moderate: 1, rarely: 1, usually: 1, comfortable: 1, well: 1, slightly: 1,
      difficult: 2, sometimes: 2, uncomfortable: 2, somewhat: 2, short: 2, yes: 2, more: 2,
      very_difficult: 3, often: 3, avoid: 3, poorly: 3, very_short: 3, strongly: 3, always: 3, extensive: 3,
    };

    let total = 0;
    let count = 0;
    questionIds.forEach((id) => {
      const response = responses[id];
      if (response && difficultyScores[response] !== undefined) {
        total += difficultyScores[response];
        count++;
      }
    });

    return count > 0 ? Math.round(total / count) : 1;
  };

  const getFocusAreas = (reading: number, spelling: number, phonics: number) => {
    const areas: string[] = [];
    if (reading >= 2) areas.push("reading_fluency");
    if (spelling >= 2) areas.push("spelling_practice");
    if (phonics >= 2) areas.push("phonics_training");
    if (areas.length === 0) areas.push("general_practice");
    return areas;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-medium text-primary">Parent Assessment</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create {studentName ? `${studentName}'s` : "Your Child's"} Study Plan
        </h1>
        <p className="text-muted-foreground text-lg">
          Answer these questions about your child to personalize their learning experience
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="capitalize">{question.category.replace("_", " ")}</span>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
          <CardDescription>
            Select the option that best describes your child
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={responses[question.id] || ""}
            onValueChange={(value) =>
              setResponses((prev) => ({ ...prev, [question.id]: value }))
            }
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                  responses[question.id] === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
                onClick={() =>
                  setResponses((prev) => ({ ...prev, [question.id]: option.value }))
                }
              >
                <RadioGroupItem value={option.value} id={`parent-${option.value}`} />
                <Label
                  htmlFor={`parent-${option.value}`}
                  className="flex-1 cursor-pointer text-base"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed || isSubmitting}
          className="gap-2"
        >
          {isLastQuestion ? (
            isSubmitting ? "Saving..." : "Complete Assessment"
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
