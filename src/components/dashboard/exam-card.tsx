// ExamCard.tsx
import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface ExamCardProps {
  title?: string;
  icon?: React.ReactNode;
  typeLabel?: string;
  questionCount?: number;
  durationMinutes?: number;
  marks?: number;
  buttonText?: string;
  onStart?: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({
  title,
  icon,
  typeLabel,
  questionCount = 30,
  durationMinutes = 120,
  marks,
  buttonText,
  onStart,
}) => {
  const { t } = useLanguage();
  return (
    <div style={styles.card}>
      <div style={styles.leftSection}>
        {/* Illustration */}
        <div style={styles.iconWrapper}>
          {icon ?? (
          <svg
            viewBox="0 0 80 80"
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Paper / Whiteboard */}
            <rect x="8" y="6" width="56" height="44" rx="4" fill="#F3F4F6" stroke="#374151" strokeWidth="2" />
            <line x1="8" y1="14" x2="64" y2="14" stroke="#374151" strokeWidth="2" />
            {/* Checkmark */}
            <path d="M18 28 L24 34 L34 22" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* X mark */}
            <path d="M42 24 L52 34 M52 24 L42 34" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            {/* Pencil */}
            <rect x="50" y="4" width="24" height="6" rx="2" transform="rotate(15 50 4)" fill="#FBBF24" stroke="#374151" strokeWidth="1.5" />
            <rect x="72" y="7" width="6" height="4" rx="1" transform="rotate(15 72 7)" fill="#EF4444" stroke="#374151" strokeWidth="1.5" />
            {/* Ruler */}
            <polygon points="4,50 30,38 50,58 24,70" fill="#FDE68A" stroke="#374151" strokeWidth="1.5" />
            <line x1="12" y1="48" x2="16" y2="46" stroke="#374151" strokeWidth="1" />
            <line x1="18" y1="54" x2="22" y2="52" stroke="#374151" strokeWidth="1" />
            <line x1="24" y1="60" x2="28" y2="58" stroke="#374151" strokeWidth="1" />
            <line x1="30" y1="66" x2="34" y2="64" stroke="#374151" strokeWidth="1" />
            {/* Calculator */}
            <rect x="42" y="42" width="34" height="36" rx="5" fill="#FEF3C7" stroke="#374151" strokeWidth="2" />
            <rect x="46" y="46" width="26" height="10" rx="2" fill="#E5E7EB" stroke="#374151" strokeWidth="1.5" />
            <circle cx="50" cy="51" r="1.5" fill="#374151" />
            <circle cx="55" cy="51" r="1.5" fill="#374151" />
            {/* Calculator buttons */}
            <rect x="46" y="60" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="54" y="60" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="62" y="60" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="70" y="60" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="46" y="68" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="54" y="68" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="62" y="68" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
            <rect x="70" y="68" width="6" height="6" rx="1" fill="#FBBF24" stroke="#374151" strokeWidth="1" />
          </svg>
          )}
        </div>

        {/* Text Content */}
        <div style={styles.textContent}>
          <h3 style={styles.title}>{title ?? t('exam.defaultTitle')}</h3>
          {typeLabel && <span style={styles.typeBadge}>{typeLabel}</span>}
          <div style={styles.metaRow}>
            <span style={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              {t('exam.questionCount', { count: questionCount })}
            </span>
            <span style={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {t('exam.durationMinutes', { count: durationMinutes })}
            </span>
            {marks != null && (
              <span style={styles.metaItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                </svg>
                {t('exam.marks', { count: marks })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button style={styles.button} onClick={onStart} onMouseEnter={(e) => (e.currentTarget.style.background = '#0D3F6B')} onMouseLeave={(e) => (e.currentTarget.style.background = '#0F4C81')}>
        {buttonText ?? t('exam.start')}
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    background: 'var(--card)',
    borderRadius: '16px',
    color: 'var(--card-foreground)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
    width: '100%',
    gap: '16px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    flexShrink: 0,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--card-foreground)',
    lineHeight: 1.3,
  },
  typeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: '2px 10px',
    borderRadius: '999px',
    background: 'var(--accent)',
    color: 'var(--foreground)',
    fontSize: '12px',
    fontWeight: 500,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'var(--muted-foreground)',
    fontSize: '14px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  button: {
    padding: '10px 22px',
    background: '#0F4C81',
    color: '#ffffff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
};

export default ExamCard;