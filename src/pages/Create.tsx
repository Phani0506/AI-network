import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function Create() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ikigai: '',
    skills: '',
    interests: '',
    intent: '',
    portfolio_url: '',
    linkedin: '',
    twitter: '',
    working_style: '',
    availability: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase configuration missing. Please set up your environment variables.');
      }

      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          ...formData,
          skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
          interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean)
        }])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === '23505') { // Unique constraint violation
          navigate('/error?reason=email-taken');
          return;
        }
        throw error;
      }

      if (data && data[0]) {
        navigate(`/profile/${data[0].id}`);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      // Show more specific error information
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred. Please check your Supabase configuration.');
      }
      navigate('/error?reason=unknown');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Your Profile</CardTitle>
          <CardDescription className="text-lg">
            Tell us about yourself and what you're looking for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  required
                  className="rounded-2xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  required
                  className="rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ikigai">Your Ikigai *</Label>
              <Textarea
                id="ikigai"
                placeholder="What's your reason for being? What drives you?"
                value={formData.ikigai}
                onChange={(e) => updateFormData('ikigai', e.target.value)}
                required
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills *</Label>
              <Input
                id="skills"
                placeholder="React, Python, Marketing, Design (comma-separated)"
                value={formData.skills}
                onChange={(e) => updateFormData('skills', e.target.value)}
                required
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests *</Label>
              <Input
                id="interests"
                placeholder="AI, Startups, Music, Travel (comma-separated)"
                value={formData.interests}
                onChange={(e) => updateFormData('interests', e.target.value)}
                required
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intent">What are you looking for? *</Label>
              <Select value={formData.intent} onValueChange={(value) => updateFormData('intent', value)}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Select your intent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cofounder">Cofounder</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="teammate">Teammate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio_url">Portfolio URL</Label>
              <Input
                id="portfolio_url"
                type="url"
                placeholder="https://your-portfolio.com"
                value={formData.portfolio_url}
                onChange={(e) => updateFormData('portfolio_url', e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourname"
                  value={formData.linkedin}
                  onChange={(e) => updateFormData('linkedin', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/yourhandle"
                  value={formData.twitter}
                  onChange={(e) => updateFormData('twitter', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="working_style">Working Style *</Label>
              <Textarea
                id="working_style"
                placeholder="Describe your working style, preferences, and approach to collaboration"
                value={formData.working_style}
                onChange={(e) => updateFormData('working_style', e.target.value)}
                required
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability *</Label>
              <Input
                id="availability"
                placeholder="Full-time, Part-time, Weekends, etc."
                value={formData.availability}
                onChange={(e) => updateFormData('availability', e.target.value)}
                required
                className="rounded-2xl"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-2xl text-lg py-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}