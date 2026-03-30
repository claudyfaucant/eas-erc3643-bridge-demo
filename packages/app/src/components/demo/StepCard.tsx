'use client'

import { ReactNode } from 'react'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  isActive: boolean
  isCompleted: boolean
  isLocked: boolean
  children: ReactNode
}

export function StepCard({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted,
  isLocked,
  children,
}: StepCardProps) {
  return (
    <div
      className={`card bg-base-200 shadow-md step-card ${isLocked ? 'locked' : ''} ${
        isActive ? 'ring-2 ring-primary' : ''
      }`}
    >
      <div className="card-body">
        <div className="flex items-start gap-4">
          {/* Step indicator */}
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
              isCompleted
                ? 'bg-success text-success-content'
                : isActive
                ? 'bg-primary text-primary-content'
                : 'bg-base-300 text-base-content/50'
            }`}
          >
            {isCompleted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              stepNumber
            )}
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="card-title text-lg mb-1">
              {title}
              {isLocked && (
                <span className="badge badge-sm badge-ghost ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Locked
                </span>
              )}
            </h3>
            <p className="text-sm text-base-content/60 mb-4">{description}</p>
            {!isLocked && children}
          </div>
        </div>
      </div>
    </div>
  )
}
