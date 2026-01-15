import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Award,
  ExternalLink,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { FaAutoprefixer } from "react-icons/fa";
import { format } from "date-fns";

const Certificates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    credential_url: "",
    issued_date: "",
  });

  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificates", user?.id],
    // Placeholder until real certificates API exists
    queryFn: async () => [],
    enabled: !!user,
  });

  const addCertificate = useMutation({
    mutationFn: async (cert: typeof formData) => {
      const xpAwarded = 50;

      // Placeholder: pretend we created a certificate and awarded XP
      const mockCert = {
        id: Date.now().toString(),
        user_id: user!.id,
        title: cert.title,
        issuer: cert.issuer,
        credential_url: cert.credential_url || null,
        issued_date: cert.issued_date,
        xp_awarded: xpAwarded,
        verified: true,
      };

      const xpResult = {
        success: true,
        xpEarned: xpAwarded,
        levelUp: false,
      };

      return { ...mockCert, xpResult };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["activity-log"] });
      
      const levelMsg = data.xpResult?.levelUp ? " 🎉 Level Up!" : "";
      toast({ 
        title: "Certificate Added!", 
        description: `You earned ${data.xpResult?.xpEarned || 50} XP!${levelMsg}` 
      });
      setDialogOpen(false);
      setFormData({ title: "", issuer: "", credential_url: "", issued_date: "" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const totalXP = certificates?.reduce((sum, c) => sum + (c.xp_awarded || 0), 0) || 0;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Certificates</h1>
            <p className="text-muted-foreground">
              Add your certifications to boost your Knowledge stat
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Certificate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Add Certificate</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addCertificate.mutate(formData);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Certificate Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="AWS Solutions Architect"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuing Organization</Label>
                  <Input
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Credential URL (optional)</Label>
                  <Input
                    value={formData.credential_url}
                    onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                    placeholder="https://www.credly.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input
                    type="date"
                    value={formData.issued_date}
                    onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={addCertificate.isPending}>
                  {addCertificate.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Add Certificate"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <GlowCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">
                  {certificates?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Certificates</p>
              </div>
            </div>
          </GlowCard>
          <GlowCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <FaAutoprefixer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{totalXP}</p>
                <p className="text-xs text-muted-foreground">XP from Learning</p>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Certificates Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : certificates?.length === 0 ? (
          <GlowCard className="p-12 text-center">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your certifications to boost your Knowledge stat
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Certificate
            </Button>
          </GlowCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates?.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard className="h-full flex flex-col" glowColor="hsl(var(--accent))">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    {cert.verified ? (
                      <Badge className="bg-green-500/10 text-green-500 border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/10 text-yellow-500 border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.issuer}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(cert.issued_date), "MMM yyyy")}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-sm font-display font-semibold text-primary">
                        <FaAutoprefixer className="w-4 h-4" />
                        +{cert.xp_awarded} XP
                      </span>
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
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
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Certificates;
