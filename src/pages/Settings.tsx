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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Shield,
  Bell,
  Loader2,
  Save,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const roleOptions = [
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "AI/ML Engineer",
  "QA Engineer",
  "IT HR",
  "IT Sales",
];

const techOptions = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js", 
  "Python", "Java", "Go", "Rust", "C++", "C#",
  "PostgreSQL", "MongoDB", "MySQL", "Redis",
  "AWS", "GCP", "Azure", "Docker", "Kubernetes",
  "GraphQL", "REST", "gRPC",
];

const Settings = () => {
  const { user } = useAuth();
  const { profile, refetch } = useUserData();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    primary_role: profile?.primary_role || "",
    tech_stack: profile?.tech_stack || [],
    github_username: profile?.github_username || "",
    linkedin_url: profile?.linkedin_url || "",
    portfolio_url: profile?.portfolio_url || "",
  });

  const [selectedRole, setSelectedRole] = useState<string>("");

  // Update form when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        primary_role: profile.primary_role || "",
        tech_stack: profile.tech_stack || [],
        github_username: profile.github_username || "",
        linkedin_url: profile.linkedin_url || "",
        portfolio_url: profile.portfolio_url || "",
      });
    }
  });

  const updateProfile = useMutation({
    // Placeholder until real profile update API exists
    mutationFn: async (data: typeof formData) => {
      console.log("Profile update placeholder", { userId: user?.id, data });
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      refetch();
      toast({ title: "Profile Updated!", description: "Your changes have been saved." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Roles/role management are disabled for now

  const toggleTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter(t => t !== tech)
        : [...prev.tech_stack, tech],
    }));
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and account preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile.mutate(formData);
              }}
              className="space-y-6"
            >
              <GlowCard>
                <h3 className="font-display font-semibold text-lg mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Role</Label>
                    <Select
                      value={formData.primary_role}
                      onValueChange={(v) => setFormData({ ...formData, primary_role: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </GlowCard>

              <GlowCard>
                <h3 className="font-display font-semibold text-lg mb-4">Tech Stack</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the technologies you work with
                </p>
                <div className="flex flex-wrap gap-2">
                  {techOptions.map(tech => (
                    <Badge
                      key={tech}
                      variant={formData.tech_stack.includes(tech) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => toggleTech(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </GlowCard>

              <GlowCard>
                <h3 className="font-display font-semibold text-lg mb-4">Social Links</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub Username
                    </Label>
                    <Input
                      value={formData.github_username}
                      onChange={(e) => setFormData({ ...formData, github_username: e.target.value })}
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn URL
                    </Label>
                    <Input
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Portfolio URL
                    </Label>
                    <Input
                      value={formData.portfolio_url}
                      onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>
              </GlowCard>

              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                Save Changes
              </Button>
            </form>
          </TabsContent>

          {/* Roles tab is disabled for now */}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
