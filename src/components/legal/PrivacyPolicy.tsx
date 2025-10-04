export const PrivacyPolicy = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Create an account</li>
            <li>Take tests and assessments</li>
            <li>Submit responses or feedback</li>
            <li>Contact us for support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Provide and improve our services</li>
            <li>Track your progress</li>
            <li>Generate personalized recommendations</li>
            <li>Send important updates and notifications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. Your data is encrypted and stored securely.
          </p>
        </section>
      </div>
    </section>
  );
};
