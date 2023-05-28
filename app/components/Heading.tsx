"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  children,
}) => {
  return (
    <div
      className={
        center ? "text-center" : "text-start flex justify-between items-center"
      }
    >
      <div>
        <div className="text-2xl font-bold">{title}</div>
        {subtitle && (
          <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Heading;
