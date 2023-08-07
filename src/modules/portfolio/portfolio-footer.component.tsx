import React from "react";
export default function Footer() {
  return (
    <footer className="h-44 mt-44 flex justify-center items-center">
      Built with
      <a
        href="https://nextjs.org/"
        className="text-primary mx-1"
        target="_blank"
      >
        ReactJS
      </a>
      and
      <a
        href="https://tailwindcss.com/"
        className="text-primary  mx-1"
        target="_blank"
      >
        Tailwind CSS
      </a>
      , deployed with
      <a href="https://aws.amazon.com/" className="text-primary  mx-1">
        AWS
      </a>
    </footer>
  );
}
