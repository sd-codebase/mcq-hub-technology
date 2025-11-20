export const PrivacyPolicyQuizzyDockApp = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-white mb-8">
        Privacy Policy for QuizzyDock App
      </h1>
      <div className="space-y-6 text-gray-300">
        <p className="text-sm text-gray-400">
          Effective Date: November 19, 2025
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Information We Collect
          </h2>
          <p>
            We do not collect or store any personal information (such as name,
            email, phone, or location) from users.
          </p>
          <p className="mt-4">
            The app may gather non-personal information including device
            specifications, usage analytics, crash diagnostics, and aggregated
            metrics through third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Third-Party Services
          </h2>
          <p>
            {
              "MongoDB provides storage functionality for the QuizzyDock app. We encourage you to review MongoDB's privacy policy independently to understand how they handle your data."
            }
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            How We Use Your Information
          </h2>
          <p>Collected technical data serves operational purposes including:</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Ensuring app reliability and performance</li>
            <li>Identifying and fixing bugs</li>
            <li>Analyzing usage patterns to improve features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            User Protections
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>No signup required for using the app</li>
            <li>No contact or location access permissions requested</li>
            <li>
              Users under 13 receive special protections in accordance with
              applicable laws
            </li>
            <li>
              Any future permission requests will require explicit user consent
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Data Security
          </h2>
          <p>
            KS Labs Edu maintains reasonable protective measures for data
            security. However, we cannot guarantee absolute protection against
            third-party breaches beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Contact Us
          </h2>
          <p>
            If you have any privacy concerns or questions about this policy,
            please contact us at:{" "}
            <a
              href="mailto:krishna.dhas021815@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 transition duration-150"
            >
              krishna.dhas021815@gmail.com
            </a>
          </p>
        </section>
      </div>
    </section>
  );
};
