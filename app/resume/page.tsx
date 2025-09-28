import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"
import { profileData } from "@/data/profile"

export const metadata: Metadata = {
  title: 'Resume - Ali Emre Dağ',
  description: 'Printable resume of Ali Emre Dağ - Global Supply Chain Manager',
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Print-hidden navigation */}
      <div className="no-print bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button asChild size="sm">
              <a href="/Ali-Emre-Dag-Resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="print-page max-w-4xl mx-auto p-8 bg-white text-black print:text-black print:bg-white">
        {/* Header */}
        <header className="text-center mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">{profileData.name}</h1>
          <h2 className="text-xl text-gray-700 mb-4">{profileData.title}</h2>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <span>{profileData.contact.email}</span>
            <span>{profileData.contact.phone}</span>
            <span>{profileData.contact.location}</span>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-1">
            Professional Summary
          </h3>
          <p className="text-sm leading-relaxed text-gray-800">
            {profileData.about}
          </p>
        </section>

        {/* Key Achievements */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-1">
            Key Achievements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {profileData.kpiStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-900 font-mono">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-1">
            Professional Experience
          </h3>
          {profileData.experience.map((job, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{job.position}</h4>
                  <p className="text-base font-medium text-gray-700">{job.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{job.startDate} - {job.endDate}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{job.description}</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                {job.highlights.slice(0, 4).map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-1">
            Education
          </h3>
          {profileData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.period}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-1">
            Core Skills
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-gray-900">Core Competencies</h4>
              <p className="text-gray-700">
                {profileData.skills.core.slice(0, 8).join(', ')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900">Tools & Methods</h4>
              <p className="text-gray-700">
                {[...profileData.skills.tools, ...profileData.skills.methods].join(', ')}
              </p>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-1">
            Languages
          </h3>
          <div className="flex space-x-6 text-sm">
            {profileData.languages.map((lang, index) => (
              <span key={index} className="text-gray-700">
                <strong>{lang.name}:</strong> {lang.level}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}