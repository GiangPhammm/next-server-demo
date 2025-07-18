'use client'

export default function Error ({error, reset}) {
    return (
        <div>
            <h2>{error.message || 'Something went wrong'}</h2>
            <button onclick={() => reset()}>
                Try again
            </button>
        </div>
    )
}