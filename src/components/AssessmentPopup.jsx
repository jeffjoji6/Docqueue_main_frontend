import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ExclamationTriangleIcon,
  UserIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

export default function AssessmentPopup({
  isOpen,
  onClose,
  score,
  disease,
  severity,
  onProceed,
}) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-50";
      case "Medium":
        return "text-orange-600 bg-orange-50";
      case "Low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRecommendation = () => {
    if (score > 5) {
      return {
        title: "Emergency Care Required",
        description:
          "Based on your symptoms, immediate medical attention is recommended.",
        icon: ExclamationTriangleIcon,
        color: "text-red-600 bg-red-50",
        action: "Proceed to Emergency",
      };
    } else if (score > 4) {
      return {
        title: "Regular Doctor Appointment",
        description:
          "Your condition requires a professional medical evaluation.",
        icon: UserIcon,
        color: "text-blue-600 bg-blue-50",
        action: "Schedule Appointment",
      };
    } else {
      return {
        title: "AI Doctor Consultation",
        description:
          "Your symptoms can be assessed through our AI Doctor service.",
        icon: ChatBubbleLeftIcon,
        color: "text-green-600 bg-green-50",
        action: "Consult AI Doctor",
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-center mb-4">
                  <div className={`rounded-full p-3 ${recommendation.color}`}>
                    <recommendation.icon className="h-8 w-8" />
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center mb-2"
                >
                  {recommendation.title}
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Assessment Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Condition:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {disease}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Severity Score:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {score}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Severity Level:
                        </span>
                        <span
                          className={`text-sm font-medium ${getSeverityColor(
                            severity
                          )} px-2 py-1 rounded-full`}
                        >
                          {severity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-700 mb-2">
                      Recommendation
                    </h4>
                    <p className="text-sm text-blue-600">
                      {recommendation.description}
                    </p>
                  </div>

                  {score > 5 && (
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                        <h4 className="text-sm font-medium text-red-700">
                          Urgent Action Required
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-red-600">
                        Please proceed to the emergency department immediately
                        for immediate medical attention.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      onClose();
                      onProceed();
                    }}
                  >
                    {recommendation.action}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
