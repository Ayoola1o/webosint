export function RemediationTips({ breachType }: { breachType: 'email' | 'password' }) {
    const tips = {
      email: ["Monitor phishing emails", "Update recovery phone numbers"],
      password: ["Change password", "Enable 2FA"],
    };
  
    return (
      <div className="mt-4 space-y-2">
        {tips[breachType].map((tip) => (
          <div key={tip} className="flex items-center">
            <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
            {tip}
          </div>
        ))}
      </div>
    );
  }