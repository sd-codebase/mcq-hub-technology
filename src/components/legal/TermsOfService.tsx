export const TermsOfService = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using Quizzy Dock, you agree to be bound by these Terms
            of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            User Accounts
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>
              You are responsible for maintaining the confidentiality of your
              account
            </li>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Content Usage
          </h2>
          <p>
            All content provided on Quizzy Dock is for educational purposes only. You
            may not reproduce, distribute, or use our content for commercial
            purposes without explicit permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the platform after changes constitutes acceptance of new
            terms.
          </p>
        </section>
      </div>
    </section>
  );
};
