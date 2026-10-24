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
		className={cn(
			"max-w-2xl px-4 mx-auto container h-screen",

			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export default Container;
