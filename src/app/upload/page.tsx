"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Callout, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Loader } from "@/components/Loader";
import { useLoading } from "@/app/providers/LoadingProvider";
import { uploadFile } from "@/app/lib/api";

const fileTypes = ["PDF"];

export default function UploadPage() {
  const { setIsLoading } = useLoading();
  const [error, setError] = useState<string>(undefined);
  const [file, setFile] = useState<File>(undefined);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const handleUpload = async () => {
    setError(undefined);
    setIsLoading(true);

    const response = await uploadFile(file);
    setIsLoading(false);

    console.log("response", response);

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      return;
    }

    window.location.href = `/chat/`;
  };

  return (
    <main className="flex h-full flex-col items-center justify-between p-24 bg-stone-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="m-auto relative">
          <Loader />
          <div className="text-center m-auto">
            {error && (
              <Callout.Root mb="6" color="red">
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}

            <Heading as="h1" size="8" mb="4">
              Upload PDF file
            </Heading>
            <Text as="p" mb="4">
              Are you ready to chat with your files? Upload a PDF file to get
              started.
            </Text>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            >
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-stone-700 bg-stone-800 rounded-lg">
                <svg
                  width="92px"
                  height="92px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="0.5"
                      d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                      fill="#487a3e"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.25 10C7.25 9.58579 7.58579 9.25 8 9.25H16C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75H8C7.58579 10.75 7.25 10.4142 7.25 10Z"
                      fill="#487a3e"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H13C13.4142 13.25 13.75 13.5858 13.75 14C13.75 14.4142 13.4142 14.75 13 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14Z"
                      fill="#487a3e"
                    ></path>{" "}
                  </g>
                </svg>

                <Text mt="4">
                  {!file
                    ? "Drag and drop a file, or click here to browse"
                    : file.name}
                </Text>
              </div>
            </FileUploader>
            <div className="mt-2">
              <Button
                disabled={!file}
                className="w-full"
                onClick={handleUpload}
                size="3"
              >
                <ArrowRightIcon />
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
