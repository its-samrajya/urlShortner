import { cn } from "@/lib/utils";

const Container = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
	animate?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8", className)}
		{...props}
	>
		{children}
	</div>
);

export default Container;
