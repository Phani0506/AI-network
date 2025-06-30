import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Navigation() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black">NetworkAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/members" className="text-gray-600 hover:text-black transition-colors">
              Members
            </Link>
            <Link to="/matches" className="text-gray-600 hover:text-black transition-colors">
              Matches
            </Link>
            <Button asChild className="rounded-2xl">
              <Link to="/create">Create Profile</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Button asChild size="sm" className="rounded-2xl">
              <Link to="/create">Join</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}