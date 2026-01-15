import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TitleBadge } from "@/components/ui/TitleBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  Loader2,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const statusConfig = {
  open: { color: "text-green-500", bg: "bg-green-500/10", label: "Open" },
  in_progress: { color: "text-blue-500", bg: "bg-blue-500/10", label: "In Progress" },
  completed: { color: "text-primary", bg: "bg-primary/10", label: "Completed" },
  cancelled: { color: "text-muted-foreground", bg: "bg-muted", label: "Cancelled" },
  disputed: { color: "text-red-500", bg: "bg-red-500/10", label: "Disputed" },
};

const Gigs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedRate, setProposedRate] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    budget_min: "",
    budget_max: "",
    required_level: "1",
    deadline: "",
  });

  // Placeholder: roles system disabled for now
  const isClient = false;

  const { data: gigs, isLoading } = useQuery({
    queryKey: ["gigs"],
    // Placeholder until real gigs API exists
    queryFn: async () => [],
  });

  const { data: myApplications } = useQuery({
    queryKey: ["my-applications", user?.id],
    // Placeholder until real applications API exists
    queryFn: async () => [],
    enabled: !!user,
  });

  const createGig = useMutation({
    mutationFn: async (gig: typeof formData) => {
      const techStack = gig.tech_stack.split(",").map(t => t.trim()).filter(Boolean);
      
      // Placeholder: pretend we created a gig
      return {
        id: Date.now().toString(),
        client_id: user!.id,
        title: gig.title,
        description: gig.description,
        tech_stack: techStack,
        budget_min: gig.budget_min ? parseInt(gig.budget_min) : null,
        budget_max: gig.budget_max ? parseInt(gig.budget_max) : null,
        required_level: parseInt(gig.required_level),
        deadline: gig.deadline || null,
        status: "open",
        created_at: new Date().toISOString(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gigs"] });
      toast({ title: "Gig Posted!", description: "Candidates can now apply to your gig." });
      setDialogOpen(false);
      setFormData({ title: "", description: "", tech_stack: "", budget_min: "", budget_max: "", required_level: "1", deadline: "" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const applyToGig = useMutation({
    mutationFn: async ({ gigId, coverLetter, proposedRate }: { gigId: string; coverLetter: string; proposedRate: number }) => {
      // Placeholder: pretend we created an application
      return {
        id: Date.now().toString(),
        gig_id: gigId,
        applicant_id: user!.id,
        cover_letter: coverLetter,
        proposed_rate: proposedRate,
        status: "pending",
        created_at: new Date().toISOString(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      toast({ title: "Application Sent!", description: "The client will review your application." });
      setApplyDialogOpen(false);
      setCoverLetter("");
      setProposedRate("");
    },
    onError: (error) => {
      if (error.message.includes("duplicate")) {
        toast({ title: "Already Applied", description: "You've already applied to this gig.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    },
  });

  const hasApplied = (gigId: string) => {
    return myApplications?.some(a => a.gig_id === gigId);
  };

  const openGigs = gigs?.filter(g => g.status === "open") || [];
  const myGigs = gigs?.filter(g => g.client_id === user?.id) || [];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Freelance Gigs</h1>
            <p className="text-muted-foreground">
              Find gigs to work on and level up your Prolancer title
            </p>
          </div>
          {isClient && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Post a Gig
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display">Post New Gig</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createGig.mutate(formData);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label>Gig Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Build a REST API..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed requirements..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Budget Min ($)</Label>
                      <Input
                        type="number"
                        value={formData.budget_min}
                        onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                        placeholder="500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Max ($)</Label>
                      <Input
                        type="number"
                        value={formData.budget_max}
                        onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                        placeholder="2000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tech Stack (comma-separated)</Label>
                    <Input
                      value={formData.tech_stack}
                      onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                      placeholder="Node.js, PostgreSQL, AWS"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Level Required</Label>
                    <Select
                      value={formData.required_level}
                      onValueChange={(v) => setFormData({ ...formData, required_level: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Level 1+ (Beginner)</SelectItem>
                        <SelectItem value="10">Level 10+ (Intermediate)</SelectItem>
                        <SelectItem value="25">Level 25+ (Advanced)</SelectItem>
                        <SelectItem value="50">Level 50+ (Expert)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={createGig.isPending}>
                    {createGig.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Post Gig"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Gigs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            {isClient && <TabsTrigger value="posted">My Posted Gigs</TabsTrigger>}
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : openGigs.length === 0 ? (
              <GlowCard className="p-12 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">No Open Gigs</h3>
                <p className="text-muted-foreground">
                  Check back later for new opportunities!
                </p>
              </GlowCard>
            ) : (
              openGigs.map((gig, index) => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlowCard>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {gig.title}
                          </h3>
                          <Badge className={`${statusConfig[gig.status as keyof typeof statusConfig].bg} ${statusConfig[gig.status as keyof typeof statusConfig].color} border-0`}>
                            {statusConfig[gig.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {gig.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {gig.tech_stack?.map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          {(gig.budget_min || gig.budget_max) && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${gig.budget_min || 0} - ${gig.budget_max || "∞"}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Level {gig.required_level}+
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDistanceToNow(new Date(gig.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {gig.client_id !== user?.id && (
                          hasApplied(gig.id) ? (
                            <Button variant="secondary" disabled>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Applied
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setSelectedGig(gig);
                                setApplyDialogOpen(true);
                              }}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {myApplications?.length === 0 ? (
              <GlowCard className="p-12 text-center">
                <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground">
                  Browse gigs and apply to start earning!
                </p>
              </GlowCard>
            ) : (
              myApplications?.map((app) => (
                <GlowCard key={app.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-semibold">{app.gig?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Applied {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <Badge className={app.status === "accepted" ? "bg-green-500/10 text-green-500" : app.status === "rejected" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"}>
                      {app.status}
                    </Badge>
                  </div>
                </GlowCard>
              ))
            )}
          </TabsContent>

          {isClient && (
            <TabsContent value="posted" className="space-y-4">
              {myGigs.length === 0 ? (
                <GlowCard className="p-12 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">No Posted Gigs</h3>
                  <p className="text-muted-foreground mb-4">
                    Post your first gig to find talented freelancers
                  </p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Post a Gig
                  </Button>
                </GlowCard>
              ) : (
                myGigs.map((gig) => (
                  <GlowCard key={gig.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-semibold">{gig.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Posted {formatDistanceToNow(new Date(gig.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <Badge className={`${statusConfig[gig.status as keyof typeof statusConfig].bg} ${statusConfig[gig.status as keyof typeof statusConfig].color} border-0`}>
                        {statusConfig[gig.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                  </GlowCard>
                ))
              )}
            </TabsContent>
          )}
        </Tabs>

        {/* Apply Dialog */}
        <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Apply to: {selectedGig?.title}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedGig) {
                  applyToGig.mutate({
                    gigId: selectedGig.id,
                    coverLetter,
                    proposedRate: parseInt(proposedRate) || 0,
                  });
                }
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Cover Letter</Label>
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Why are you the best fit for this gig?"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Proposed Rate ($)</Label>
                <Input
                  type="number"
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  placeholder="1000"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={applyToGig.isPending}>
                {applyToGig.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Gigs;
