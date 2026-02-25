import { useMemo, useState } from 'react'
import { SKILLS } from '../../data/skills'
import Section from '../layout/Section'

export default function Skills() {
  const [rotationY, setRotationY] = useState(0)
  const [rotationX, setRotationX] = useState(-8)

  const allSkills = useMemo(
    () =>
      Array.from(new Set(SKILLS.flatMap((g) => g.items)))
        .slice(0, 44),
    []
  )

  const positionedSkills = useMemo(() => {
    const radius = 138
    const count = allSkills.length || 1

    return allSkills.map((skill, idx) => {
      // Fibonacci sphere distribution for an "apple watch cloud" look.
      const phi = Math.acos(1 - (2 * (idx + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * idx

      let x = radius * Math.cos(theta) * Math.sin(phi)
      let y = radius * Math.cos(phi)
      let z = radius * Math.sin(theta) * Math.sin(phi)

      // Apply user-controlled rotations.
      const ry = (rotationY * Math.PI) / 180
      const rx = (rotationX * Math.PI) / 180

      const x1 = x * Math.cos(ry) - z * Math.sin(ry)
      const z1 = x * Math.sin(ry) + z * Math.cos(ry)
      x = x1
      z = z1

      const y1 = y * Math.cos(rx) - z * Math.sin(rx)
      const z2 = y * Math.sin(rx) + z * Math.cos(rx)
      y = y1
      z = z2

      const zNormalized = (z + radius) / (2 * radius)
      const scale = 0.58 + zNormalized * 0.72
      const opacity = 0.24 + zNormalized * 0.82
      const isFront = zNormalized > 0.82

      return {
        skill,
        x,
        y,
        z,
        scale,
        opacity,
        isFront,
      }
    })
  }, [allSkills, rotationY, rotationX])

  const highlighted = useMemo(
    () =>
      [...positionedSkills]
        .sort((a, b) => b.z - a.z)
        .slice(0, 6)
        .map((s) => s.skill),
    [positionedSkills]
  )

  return (
    <Section id="skills" title="Technical Skills Globe">
      <div className="skills-globe-wrap">
        <p className="text-sm soft-text text-center mb-4">
          Move cursor left/right to rotate the sphere. Front-facing skills are highlighted.
        </p>

        <div
          className="skills-globe"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const xRatio = (e.clientX - rect.left) / rect.width
            const yRatio = (e.clientY - rect.top) / rect.height

            // Much wider range so all skills can rotate into view.
            setRotationY((xRatio - 0.5) * 520)
            setRotationX((yRatio - 0.5) * 90)
          }}
          onMouseLeave={() => {
            setRotationY(0)
            setRotationX(-8)
          }}
        >
          <div className="skills-globe-ring skills-globe-ring-a" />
          <div className="skills-globe-ring skills-globe-ring-b" />
          <div className="skills-globe-ring skills-globe-ring-c" />
          {positionedSkills.map((item) => (
            <span
              key={item.skill}
              className={`skills-globe-chip ${item.isFront ? 'active' : ''}`}
              style={{
                transform: `translate(-50%, -50%) translate3d(${item.x}px, ${item.y * 0.72}px, ${item.z}px) scale(${item.scale})`,
                opacity: item.opacity,
                zIndex: Math.round(item.z + 200),
              }}
            >
              {item.skill}
            </span>
          ))}
        </div>

        <div className="mt-5 text-center">
          <p className="mt-2 font-semibold">{highlighted.join(' • ')}</p>
        </div>
      </div>
    </Section>
  )
}
