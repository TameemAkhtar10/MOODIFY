import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import './Mooadanalytics.scss'

const moodColors = {
    happy:     '#39ffa0',
    sad:       '#60a5fa',
    angry:     '#ff4d6d',
    neutral:   '#a78bfa',
    surprised: '#f59e0b',
    calm:      '#34d399',
}

const moodEmojis = {
    happy: '😄', sad: '🥺', angry: '😠',
    neutral: '😐', surprised: '😮', calm: '😌',
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
        const { name, value } = payload[0].payload
        return (
            <div className="analytics__tooltip">
                <span>{moodEmojis[name]}</span>
                <span>{name}</span>
                <span className="analytics__tooltip-count">{value}x</span>
            </div>
        )
    }
    return null
}

export default function MoodAnalytics({ moodStats }) {
    const data = Object.entries(moodStats)
        .map(([name, value]) => ({ name, value }))
        .filter(d => d.value > 0)

    const total = data.reduce((sum, d) => sum + d.value, 0)
    const dominant = data.sort((a, b) => b.value - a.value)[0]

    if (total === 0) {
        return (
            <div className="analytics analytics--empty">
                <span className="analytics__empty-icon">📊</span>
                <p>No mood data yet.</p>
                <span>Detect your mood to see analytics.</span>
            </div>
        )
    }

    return (
        <div className="analytics">
            <div className="analytics__stats">
                <div className="analytics__stat">
                    <span className="analytics__stat-value">{total}</span>
                    <span className="analytics__stat-label">Total Detections</span>
                </div>
                {dominant && (
                    <div className="analytics__stat">
                        <span className="analytics__stat-value" style={{ color: moodColors[dominant.name] }}>
                            {moodEmojis[dominant.name]} {dominant.name}
                        </span>
                        <span className="analytics__stat-label">Dominant Mood</span>
                    </div>
                )}
            </div>

            <div className="analytics__chart">
                <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            tick={{ fill: 'rgba(240,239,245,0.4)', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => moodEmojis[v] || v}
                        />
                        <YAxis
                            tick={{ fill: 'rgba(240,239,245,0.3)', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={moodColors[entry.name] || '#6b7280'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="analytics__breakdown">
                {data.map(d => (
                    <div key={d.name} className="analytics__row">
                        <span className="analytics__row-label">
                            {moodEmojis[d.name]} {d.name}
                        </span>
                        <div className="analytics__row-bar">
                            <div
                                className="analytics__row-fill"
                                style={{
                                    width: `${(d.value / total) * 100}%`,
                                    background: moodColors[d.name]
                                }}
                            />
                        </div>
                        <span className="analytics__row-pct">
                            {Math.round((d.value / total) * 100)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}