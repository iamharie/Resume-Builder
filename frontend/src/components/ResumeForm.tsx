import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResumeForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      resumeText: "",
      jobDescription: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      resumeText: Yup.string().required("Resume is required"),
      jobDescription: Yup.string().required("Job description is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(
          "https://resume-builder-yylu.onrender.com/api/tailor-resume",
          values
        );
        setSuccess(true);
      } catch (error) {
        console.error("Error tailoring resume:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Simple Notification System
        </h1>
        <p className="text-sm font-bold text-gray-800 mb-6 text-center">
          The main objective of this project is to receive the information from
          the user [Name, email, current-resume, job-description] and generate a
          tailored resume in the format of both .pdf and docx
        </p>
        <p className="text-sm font-bold text-green-800 mb-6 text-center">
          Present: Ensure you receive an email after submitting the details.
        </p>
        <p className="text-sm font-bold text-red-800 mb-6 text-center">
          Blocker: OpenAI API Key subscription
        </p>

        {success && (
          <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center mb-4">
            Check your email.
          </p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <textarea
            name="resumeText"
            placeholder="Title"
            value={formik.values.resumeText}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.resumeText ? (
            <div>{formik.errors.resumeText}</div>
          ) : null}
          <textarea
            name="jobDescription"
            placeholder="Content"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.jobDescription ? (
            <div>{formik.errors.jobDescription}</div>
          ) : null}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <div>
                <span className="spinner" /> Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
