import React, { type ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6 text-center">
          <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur">
            <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-300">
              The app hit an unexpected issue. Refresh the page or sign in again.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
