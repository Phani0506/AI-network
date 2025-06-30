import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason');

  const getErrorMessage = () => {
    switch (reason) {
      case 'email-taken':
        return {
          title: 'Email Already Exists',
          message: 'A profile with this email address already exists. Each email can only be used once.',
          suggestion: 'Try using a different email address or contact support if you need help.'
        };
      default:
        return {
          title: 'Something Went Wrong',
          message: 'We encountered an unexpected error while processing your request.',
          suggestion: 'Please try again or contact support if the problem persists.'
        };
    }
  };

  const error = getErrorMessage();

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <div className="bg-red-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-900">
            {error.title}
          </CardTitle>
          <CardDescription className="text-red-700">
            {error.message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600 text-sm">
            {error.suggestion}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-2xl">
              <Link to="/create">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}