import * as React from "react";

import { cn } from "@/lib/utils";

type SiteContainerProps = React.HTMLAttributes<HTMLDivElement>;

function SiteContainer({ className, ...props }: SiteContainerProps) {
  return <div className={cn("ui-site-container", className)} {...props} />;
}

export { SiteContainer };
