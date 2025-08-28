import React from 'react';

const MateIcon = ({ className = "", width = 80, height = 80 }) => {
  // Determinar el viewbox basado en el tamaño
  const getViewBox = () => {
    if (width <= 50) {
      // Para móviles muy pequeños
      return "250 140 100 140";
    } else if (width <= 80) {
      // Para móviles
      return "260 150 90 130";
    } else if (width <= 120) {
      // Para tablets
      return "270 160 80 120";
    } else {
      // Para desktop
      return "280 165 70 110";
    }
  };

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={getViewBox()}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="matrix(1 0 0 1 320.19 240.48)">
        <g>
          <g transform="matrix(1 0 0 1 0 0)">
            <g>
              <g transform="matrix(1.03 0 0 1.03 -5.25 15.83)">
                <path 
                  style={{
                    stroke: 'none', 
                    strokeWidth: 0, 
                    strokeDasharray: 'none', 
                    strokeLinecap: 'butt', 
                    strokeDashoffset: 0, 
                    strokeLinejoin: 'miter', 
                    strokeMiterlimit: 4, 
                    fill: '#000000', 
                    fillRule: 'nonzero', 
                    opacity: 1
                  }}
                  transform=" translate(-44.73, -67.55)" 
                  d="m 68.898 45.102 c -6.1992 3.3008 -15.398 4.8984 -24.199 4.8984 s -18 -1.6016 -24.199 -4.8984 l -3.3984 13.602 c -1.8008 7.1016 1.8008 16.301 7.8984 20.301 l 14.199 9.5 c 3 2 8 2 11.102 0 l 14.199 -9.5 c 6.1016 -4.1016 9.6016 -13.199 7.8984 -20.301 l -3.3984 -13.602 z" 
                  strokeLinecap="round" 
                />
              </g>
              <g transform="matrix(1 0 0 1 0.55 -22.48)">
                <path 
                  style={{
                    stroke: 'none', 
                    strokeWidth: 0, 
                    strokeDasharray: 'none', 
                    strokeLinecap: 'butt', 
                    strokeDashoffset: 0, 
                    strokeLinejoin: 'miter', 
                    strokeMiterlimit: 4, 
                    fill: '#000000', 
                    fillRule: 'nonzero', 
                    opacity: 1
                  }}
                  transform=" translate(-50.65, -27.5)" 
                  d="m 62.5 27.602 l 7 -7 l 13.801 -7.5 l -1.3008 -3.1016 l -12.301 5.1016 c -1.6992 0.69922 -4.1016 2.3008 -5.3984 3.6016 l -21.199 21.199 c -2.5 0 -4.8008 -0.19922 -6.8984 -0.5 l 14.199 -14.199 c -1.8008 -0.19922 -3.8008 -0.19922 -5.6992 -0.19922 c -14.699 0 -26.699 4.5 -26.699 10 s 11.898 10 26.699 10 s 26.699 -4.5 26.699 -10 s -3.3984 -5.6016 -8.8984 -7.3984 z" 
                  strokeLinecap="round" 
                />
              </g>
            </g>
          </g>
          <g transform="matrix(1.31 0 0 1.31 -6.18 15.42)">
            <text 
              xmlSpace="preserve" 
              fontFamily="Impact, Charcoal, sans-serif" 
              fontSize="17" 
              fontStyle="normal" 
              fontWeight="normal" 
              style={{
                stroke: 'none', 
                strokeWidth: 0, 
                strokeDasharray: 'none', 
                strokeLinecap: 'butt', 
                strokeDashoffset: 0, 
                strokeLinejoin: 'miter', 
                strokeMiterlimit: 4, 
                fill: 'currentColor', 
                fillRule: 'nonzero', 
                opacity: 1, 
                whiteSpace: 'pre'
              }}
            >
              <tspan 
                x="-12.43" 
                y="5.34" 
                style={{
                  strokeWidth: 1, 
                  fontStyle: 'normal', 
                  fontWeight: 'normal', 
                  fill: 'currentColor'
                }}
              >
                &lt;/&gt;
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default MateIcon;
