import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LevelRing } from "@/components/ui/LevelRing";
import { 
  User, Mail, Lock, ArrowRight, ArrowLeft, Loader2, 
  Briefcase, CheckCircle2, Sparkles, Rocket, Globe2, ListChecks
} from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface RegistrationStepperProps {
  onComplete: (data: RegistrationData) => Promise<void>;
  loading: boolean;
}

// Data passed back to Auth page; skills are comma-separated strings,
// converted to arrays right before calling the backend.
export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  coreDomain: string;
  coreSkills: string;        // comma-separated
  supportingSkills?: string; // comma-separated, optional
  commonSkills?: string;     // comma-separated, optional
}

const STEPS = [
  { id: 1, title: "Account", icon: User },
  { id: 2, title: "Skills", icon: Briefcase },
  { id: 3, title: "Summary", icon: CheckCircle2 },
];

// Validation schemas
const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(3, "Name must be at least 3 characters");
const countrySchema = z.string().min(2, "Country must be at least 2 characters");

export const RegistrationStepper = ({ onComplete, loading }: RegistrationStepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    coreDomain: "",
    coreSkills: "",
    supportingSkills: "",
    commonSkills: "",
  });

  const updateField = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      const firstResult = nameSchema.safeParse(formData.firstName.trim());
      if (!firstResult.success) newErrors.firstName = firstResult.error.errors[0].message;

      const lastResult = nameSchema.safeParse(formData.lastName.trim());
      if (!lastResult.success) newErrors.lastName = lastResult.error.errors[0].message;

      const emailResult = emailSchema.safeParse(formData.email.trim());
      if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;

      const passwordResult = passwordSchema.safeParse(formData.password);
      if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;

      const countryResult = countrySchema.safeParse(formData.country.trim());
      if (!countryResult.success) newErrors.country = countryResult.error.errors[0].message;
    }

    if (step === 2) {
      if (!formData.coreDomain.trim()) newErrors.coreDomain = "Please enter your core domain";
      const coreSkillsArray = formData.coreSkills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
      if (coreSkillsArray.length === 0) {
        newErrors.coreSkills = "Please enter at least one core skill";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      setCurrentStep(2);
      return;
    }
    await onComplete(formData);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                isActive && "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30",
                isCompleted && "bg-primary/20 text-primary",
                !isActive && !isCompleted && "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
            {index < STEPS.length - 1 && (
              <div 
                className={cn(
                  "w-8 h-0.5 mx-1 transition-all duration-300",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-xl font-bold text-foreground">Create Your Account</h2>
        <p className="text-sm text-muted-foreground mt-1">Start your journey in ANT World</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="pl-10"
            />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="pl-10"
            />
          </div>
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <div className="relative">
          <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="country"
            placeholder="Where are you based?"
            value={formData.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-xl font-bold text-foreground">Your Skills & Domain</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us where you shine so we can match you better
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="coreDomain">Core Domain</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="coreDomain"
            placeholder="e.g. Backend Developer, Frontend Developer, Data Engineer"
            value={formData.coreDomain}
            onChange={(e) => updateField("coreDomain", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.coreDomain && <p className="text-sm text-destructive">{errors.coreDomain}</p>}
      </div>

      <div className="space-y-3">
        <Label htmlFor="coreSkills">Core Skills (comma-separated)</Label>
        <Textarea
          id="coreSkills"
          placeholder="e.g. TypeScript, React, Node.js"
          value={formData.coreSkills}
          onChange={(e) => updateField("coreSkills", e.target.value)}
          className="resize-none h-20"
        />
        {errors.coreSkills && <p className="text-sm text-destructive">{errors.coreSkills}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportingSkills">Supporting Skills (optional, comma-separated)</Label>
        <Textarea
          id="supportingSkills"
          placeholder="e.g. Docker, Kubernetes, PostgreSQL"
          value={formData.supportingSkills}
          onChange={(e) => updateField("supportingSkills", e.target.value)}
          className="resize-none h-16"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commonSkills">Common/Soft Skills (optional, comma-separated)</Label>
        <Textarea
          id="commonSkills"
          placeholder="e.g. Communication, Leadership, Mentoring"
          value={formData.commonSkills}
          onChange={(e) => updateField("commonSkills", e.target.value)}
          className="resize-none h-16"
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="space-y-6"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-3" />
          </motion.div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Welcome, {formData.firstName}!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            You're ready to enter ANT World
          </p>
        </div>

        {/* Level Display */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LevelRing level={1} currentXP={0} requiredXP={100} size={140} />
        </motion.div>

        {/* Summary Card */}
        <motion.div 
          className="glass-card rounded-xl p-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-foreground font-medium">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">{formData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Core Domain</p>
              <p className="text-foreground font-medium">{formData.coreDomain}</p>
            </div>
          </div>

          {formData.coreSkills && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Core Skills</p>
              <p className="text-xs text-foreground break-words">
                {formData.coreSkills}
              </p>
            </div>
          )}

          {formData.supportingSkills && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Supporting Skills</p>
              <p className="text-xs text-foreground break-words">
                {formData.supportingSkills}
              </p>
            </div>
          )}

          {formData.commonSkills && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Common / Soft Skills</p>
              <p className="text-xs text-foreground break-words">
                {formData.commonSkills}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      {renderStepIndicator()}

      <AnimatePresence mode="wait">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </AnimatePresence>

      <div className="flex gap-3 mt-8">
        {currentStep > 1 && currentStep < 3 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2" />
                Enter ANT World
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
