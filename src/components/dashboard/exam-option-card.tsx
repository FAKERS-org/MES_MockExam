import React from 'react';

interface ExamOptionCardProps {
  title: string;
  description: string;
  iconSrc?: string;
  iconAlt?: string;
  onClick?: () => void;
}

const InfoIcon = ({ style }) => (
  <svg style={style} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.1001C17.4676 2.10031 21.8994 6.53286 21.8994 12.0005C21.8992 17.4679 17.4674 21.8997 12 21.8999C6.53237 21.8999 2.09982 17.4681 2.09961 12.0005C2.09961 6.53273 6.53224 2.1001 12 2.1001ZM12 3.8999C7.52636 3.8999 3.89941 7.52684 3.89941 12.0005C3.89963 16.474 7.52649 20.1001 12 20.1001C16.4733 20.0999 20.0994 16.4738 20.0996 12.0005C20.0996 7.52697 16.4735 3.90011 12 3.8999ZM12 9.50049C12.4969 9.50068 12.8994 9.87055 12.8994 10.3267V16.6743C12.8992 17.1303 12.4968 17.5003 12 17.5005C11.503 17.5005 11.0998 17.1304 11.0996 16.6743V10.3267C11.0996 9.87043 11.5029 9.50049 12 9.50049ZM12 6.49951C12.4968 6.49951 12.8994 6.90313 12.8994 7.3999C12.8992 7.8965 12.4966 8.30029 12 8.30029C11.5025 8.30028 11.0998 7.8965 11.0996 7.3999C11.0996 6.90313 11.5024 6.49952 12 6.49951Z" fill="currentColor"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExamOptionCard: React.FC<ExamOptionCardProps> = ({ title, description, iconSrc, iconAlt, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px 24px',
        gap: '16px',
        cursor: 'pointer',
        transition: 'all 0.15s ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--muted)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--card)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.995)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--card-foreground)',
          lineHeight: 1.4,
          margin: 0,
        }}>
          {title}
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: 'var(--muted-foreground)',
          lineHeight: 1.4,
          margin: 0,
        }}>
          <InfoIcon style={{ flexShrink: 0, color: 'var(--muted-foreground)' }} />
          <span>{description}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {iconSrc && (
          <div style={{
            flexShrink: 0,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img src={iconSrc} alt={iconAlt ?? ''} width={28} height={28} style={{ objectFit: 'contain' }} />
          </div>
        )}
        <div style={{ color: 'var(--muted-foreground)' }}>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default ExamOptionCard;
