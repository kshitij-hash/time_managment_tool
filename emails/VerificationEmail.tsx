import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Text,
  Button,
  Container,
} from "@react-email/components"

interface VerificationEmailProps {
  name: string
  link: string
}

export default function VerificationEmail({
  name,
  link,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Email Verification</Preview>
      <Heading as="h2">Verify your email address</Heading>
      <Container className="bg-gray-400">
        <Text>Hello {name},</Text>
        <Text>
          Thank you for registering on <b>Time Management App</b>. To make sure
          this is your email address, we need to verify it.
        </Text>
        <Button href={link} style={{ color: "#61dafb" }}>
          Verify here
        </Button>
      </Container>
      <Text className="text-sm text-gray-300">
        If you did not request this code, please ignore this email.
      </Text>
    </Html>
  )
}
