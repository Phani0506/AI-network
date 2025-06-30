import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Target, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          AI-Powered Networking to Find
          <span className="block text-gray-700">Cofounders, Clients & Teammates</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with like-minded professionals who share your vision. 
          Our intelligent matching helps you find the perfect collaborators for your next big project.
        </p>
        <Button asChild size="lg" className="rounded-2xl text-lg px-8 py-6">
          <Link to="/create">
            Create Your Profile
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="bg-black/5 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
            <p className="text-gray-600">
              Our AI analyzes your skills, interests, and goals to find the most compatible collaborators.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="bg-black/5 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality Network</h3>
            <p className="text-gray-600">
              Connect with verified professionals who are serious about collaboration and growth.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="bg-black/5 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Direct Communication</h3>
            <p className="text-gray-600">
              Skip the small talk. Start meaningful conversations with potential collaborators instantly.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-black mb-4">
          Ready to Find Your Next Collaborator?
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Join our community of innovators, creators, and builders. Your next big opportunity is just a connection away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-2xl">
            <Link to="/create">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-2xl">
            <Link to="/members">Browse Members</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}