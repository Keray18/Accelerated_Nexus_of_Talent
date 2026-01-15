import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Github,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Code,
} from "lucide-react";
import { FaAutoprefixer } from "react-icons/fa";

const Projects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    github_url: "",
    live_url: "",
    tech_stack: "",
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", user?.id],
    // Placeholder until real projects API exists
    queryFn: async () => [],
    enabled: !!user,
  });

  const createProject = useMutation({
    mutationFn: async (project: typeof formData) => {
      const techStack = project.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      
      const complexityScore = Math.min(10, Math.max(1, Math.floor(techStack.length / 2) + 1));
      const xpAwarded = complexityScore * 25;

      // Placeholder: pretend we created a project and awarded XP
      const mockProject = {
        id: Date.now().toString(),
        user_id: user!.id,
        title: project.title,
        description: project.description,
        github_url: project.github_url || null,
        live_url: project.live_url || null,
        tech_stack: techStack,
        complexity_score: complexityScore,
        xp_awarded: xpAwarded,
        status: "verified",
        verified_at: new Date().toISOString(),
      };

      const xpResult = {
        success: true,
        xpEarned: xpAwarded,
        levelUp: false,
      };

      return { ...mockProject, xpResult };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["activity-log"] });
      
      const xpMsg = data.xpResult.levelUp 
        ? `🎉 Level Up! You earned ${data.xpResult.xpEarned} XP!` 
        : `You earned ${data.xpResult.xpEarned} XP!`;
      
      toast({ 
        title: "Project Added!", 
        description: xpMsg
      });
      setDialogOpen(false);
      setFormData({ title: "", description: "", github_url: "", live_url: "", tech_stack: "" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
    verified: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Verified" },
    rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Rejected" },
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Showcase your work and earn XP for verified projects
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">Add New Project</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createProject.mutate(formData);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="My Awesome Project"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What does this project do?"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://myproject.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tech Stack (comma-separated)</Label>
                  <Input
                    value={formData.tech_stack}
                    onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                    placeholder="React, Node.js, PostgreSQL"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={createProject.isPending}>
                  {createProject.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Submit Project"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : projects?.length === 0 ? (
          <GlowCard className="p-12 text-center">
            <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your first project to start earning XP and building your profile
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </Button>
          </GlowCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, index) => {
              const status = statusConfig[project.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowCard className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display font-semibold text-foreground line-clamp-1">
                        {project.title}
                      </h3>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.bg}`}>
                        <StatusIcon className={`w-3 h-3 ${status.color}`} />
                        <span className={status.color}>{status.label}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {project.description || "No description provided"}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech_stack?.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {(project.tech_stack?.length || 0) > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{(project.tech_stack?.length || 0) - 4}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-1 text-sm">
                        <FaAutoprefixer className="w-4 h-4 text-primary" />
                        <span className="font-display font-semibold text-primary">
                          +{project.xp_awarded || (project.complexity_score || 1) * 25} XP
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </a>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Projects;
