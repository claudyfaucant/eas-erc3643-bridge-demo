import { Hero } from '@/components/Hero'
import { Comparison } from '@/components/Comparison'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <Comparison />

      {/* CTA Section */}
      <section className='py-20 px-4 text-center'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>Ready to see it in action?</h2>
          <p className='text-slate-400 mb-8'>
            Walk through an interactive demo showing KYC attestations, investor verification, and instant revocation.
          </p>
          <Link
            href='/demo'
            className='btn btn-lg bg-blue-600 hover:bg-blue-500 border-none text-white gap-2 px-8 shadow-lg shadow-blue-600/25'
          >
            Start Interactive Demo
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
