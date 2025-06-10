import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router';
import SignInButton from '~/components/sign-in-button';
import { useRootLoaderData } from '~/root';
import { signOut } from '@workos-inc/authkit-react-router';
import type { Route } from './+types/_index';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Example AuthKit Authenticated App' },
    {
      name: 'description',
      content: 'Example React Router application demonstrating how to use AuthKit.',
    },
  ];
};

export async function action({ request }: Route.ActionArgs) {
  // Called when the form in SignInButton is submitted
  return await signOut(request);
}

export default function Index() {
  const rootLoaderData = useRootLoaderData();
  const { user } = rootLoaderData || {};

  return (
    <Flex direction="column" align="center" gap="2">
      {user ? (
        <>
          <Heading size="8">Welcome back{user?.firstName && `, ${user?.firstName}`}.</Heading>
          <Text size="5" color="gray">
            You are now authenticated into the application.
          </Text>
          <Flex align="center" gap="3" mt="4">
            <Button asChild size="3" variant="soft">
              <Link to="/account">View account</Link>
            </Button>
            <SignInButton large />
          </Flex>
        </>
      ) : (
        <>
          <Heading size="8">AuthKit authentication example</Heading>
          <Text size="5" color="gray" mb="4">
            Sign in to view your account details
          </Text>
          <SignInButton large />
        </>
      )}
    </Flex>
  );
}
