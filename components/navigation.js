import React from 'react'
import Link from 'next/link'

const Navigation = ({ categories }) => {
  return (
    <div>
      <nav>
        <div>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {categories.map((cat) => {
              return (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
