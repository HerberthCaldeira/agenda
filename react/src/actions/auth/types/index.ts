type credentials = {
  email: string;
  password: string;
};

interface IAuth {
  middleware: "auth" | "guest";
  redirectIfAuthenticated?: string;
}

type typeAuthError = "Unauthenticated" | null;

export type { credentials, IAuth, typeAuthError };
