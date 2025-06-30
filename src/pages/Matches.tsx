import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Matches() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Brain className="h-12 w-12 text-gray-600" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            Intelligent Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Coming soon — discover intelligent matches based on your profile, skills, and collaboration goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600 text-sm">
                Advanced algorithms analyze compatibility across skills, interests, and working styles.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-green-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Perfect Collaborators</h3>
              <p className="text-gray-600 text-sm">
                Find people who complement your skills and share your vision for success.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Get personalized suggestions based on your goals and past interactions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-black mb-4">
            Be the First to Know
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            We're working hard to bring you the most intelligent matching system for professional networking. 
            In the meantime, explore our member directory to find great collaborators.
          </p>
          <Button asChild size="lg" className="rounded-2xl">
            <Link to="/members">Browse Members</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}