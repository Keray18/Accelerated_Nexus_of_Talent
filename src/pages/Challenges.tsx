import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Brain,
  Clock,
  Trophy,
  CheckCircle,
  Play,
  Loader2,
  Target,
} from "lucide-react";
import { FaAutoprefixer } from "react-icons/fa";

const difficultyConfig = {
  easy: { color: "text-green-500", bg: "bg-green-500/10", xpMultiplier: 1 },
  medium: { color: "text-yellow-500", bg: "bg-yellow-500/10", xpMultiplier: 2 },
  hard: { color: "text-orange-500", bg: "bg-orange-500/10", xpMultiplier: 3 },
  expert: { color: "text-red-500", bg: "bg-red-500/10", xpMultiplier: 5 },
};

const Challenges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [solution, setSolution] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);

  const { data: problems, isLoading: loadingProblems } = useQuery({
    queryKey: ["problems"],
    // Placeholder until real problems API exists
    queryFn: async () => [],
  });

  const { data: submissions } = useQuery({
    queryKey: ["submissions", user?.id],
    // Placeholder until real submissions API exists
    queryFn: async () => [],
    enabled: !!user,
  });

  const submitSolution = useMutation({
    mutationFn: async ({ problemId, solution }: { problemId: string; solution: string }) => {
      const problem = problems?.find(p => p.id === problemId);
      const timeTaken = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
      
      // Simulate verification (in real app, this would call an edge function)
      const isCorrect = solution.trim().length >= 20;
      const xpEarned = isCorrect ? problem?.xp_reward || 25 : 0;

      // Placeholder: pretend we stored the submission and awarded XP
      const xpResult = isCorrect
        ? { success: true, xpEarned, levelUp: false }
        : null;

      return {
        id: Date.now().toString(),
        user_id: user!.id,
        problem_id: problemId,
        solution,
        is_correct: isCorrect,
        time_taken_seconds: timeTaken,
        xp_earned: xpEarned,
        isCorrect,
        xpEarned,
        xpResult,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["activity-log"] });
      
      if (data.isCorrect) {
        const levelMsg = data.xpResult?.levelUp ? " 🎉 Level Up!" : "";
        toast({ 
          title: "Correct! 🎉", 
          description: `You earned ${data.xpEarned} XP!${levelMsg}` 
        });
      } else {
        toast({ 
          title: "Not quite right", 
          description: "Try again! Your solution needs more detail.",
          variant: "destructive"
        });
      }
      setSelectedProblem(null);
      setSolution("");
      setStartTime(null);
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const getSubmissionStatus = (problemId: string) => {
    return submissions?.find(s => s.problem_id === problemId);
  };

  const openProblem = (problem: any) => {
    setSelectedProblem(problem);
    setStartTime(new Date());
    setSolution("");
  };

  const solvedCount = submissions?.filter(s => s.is_correct).length || 0;
  const totalXP = submissions?.reduce((sum, s) => sum + (s.xp_earned || 0), 0) || 0;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Challenge Arena</h1>
          <p className="text-muted-foreground">
            Solve problems to boost your Problem Solving stat and earn XP
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <GlowCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{solvedCount}</p>
                <p className="text-xs text-muted-foreground">Problems Solved</p>
              </div>
            </div>
          </GlowCard>
          <GlowCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <FaAutoprefixer className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{totalXP}</p>
                <p className="text-xs text-muted-foreground">XP Earned</p>
              </div>
            </div>
          </GlowCard>
          <GlowCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">
                  {problems?.length ? Math.round((solvedCount / problems.length) * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">Completion</p>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Problems List */}
        {loadingProblems ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : problems?.length === 0 ? (
          <GlowCard className="p-12 text-center">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No Challenges Yet</h3>
            <p className="text-muted-foreground">
              Challenges will be added soon. Check back later!
            </p>
          </GlowCard>
        ) : (
          <div className="space-y-4">
            {problems?.map((problem, index) => {
              const config = difficultyConfig[problem.difficulty as keyof typeof difficultyConfig];
              const submission = getSubmissionStatus(problem.id);
              
              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlowCard className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-semibold text-foreground">
                            {problem.title}
                          </h3>
                          <Badge className={`${config.bg} ${config.color} border-0`}>
                            {problem.difficulty}
                          </Badge>
                          {submission?.is_correct && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {problem.description?.split('\n')[0]}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {problem.time_limit_minutes} min
                          </span>
                          <span>{problem.category}</span>
                          <span className="flex items-center gap-1 text-primary">
                            <FaAutoprefixer className="w-3 h-3" />
                            {problem.xp_reward} XP
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={submission?.is_correct ? "secondary" : "default"}
                        onClick={() => openProblem(problem)}
                      >
                        {submission?.is_correct ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Solved
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            {submission ? "Retry" : "Start"}
                          </>
                        )}
                      </Button>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Problem Modal */}
        <Dialog open={!!selectedProblem} onOpenChange={() => setSelectedProblem(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProblem && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <DialogTitle className="font-display">{selectedProblem.title}</DialogTitle>
                    <Badge className={`${difficultyConfig[selectedProblem.difficulty as keyof typeof difficultyConfig].bg} ${difficultyConfig[selectedProblem.difficulty as keyof typeof difficultyConfig].color} border-0`}>
                      {selectedProblem.difficulty}
                    </Badge>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Problem Description</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedProblem.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedProblem.time_limit_minutes} min limit
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <FaAutoprefixer className="w-4 h-4" />
                      {selectedProblem.xp_reward} XP reward
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Your Solution</h4>
                    <Textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      placeholder="Write your solution here..."
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <Button
                    onClick={() => submitSolution.mutate({ problemId: selectedProblem.id, solution })}
                    className="w-full"
                    disabled={submitSolution.isPending || !solution.trim()}
                  >
                    {submitSolution.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Submit Solution"
                    )}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Challenges;
