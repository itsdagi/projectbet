"use client";
import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";

export default function FormSubmit({
  placeholder,
  text,
}: {
  placeholder: string;
  text: string;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  // Regular expression for validating phone numbers
  const phoneRegex = /^[0-9]{10}$/;

  async function handleSubmit() {
    if (phoneNumber === "") {
      setErrorMessage("Phone number cannot be blank.");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Invalid phone number format.");
      return;
    }

    const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { phoneNumber } }),
    });

    if (!res.ok) {
      setErrorMessage("Phone number failed to submit.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("Phone number successfully submitted!");
    setPhoneNumber("");
  }

  return (
    <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
      <div className="flex flex-col">
        <div className="flex flex-row">
          {successMessage ? (
            <p className="text-green-700 bg-green-300 px-4 py-2 rounded-lg">
              {successMessage}
            </p>
          ) : (
            <>
              <input
                type="tel" // Change type to 'tel' for phone number input
                placeholder={errorMessage || placeholder}
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                className={"w-3/5 p-3 rounded-l-lg sm:w-2/3 text-gray-700"}
              />
              <button
                type="button"
                className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-400 dark:text-gray-900"
                onClick={handleSubmit}
              >
                {text}
              </button>
            </>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
