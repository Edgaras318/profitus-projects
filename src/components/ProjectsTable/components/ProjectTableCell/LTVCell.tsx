import React from 'react';
import styles from './LTVCell.module.scss';

interface LTVCellProps {
    loanRatioExternal: number;
    loanRatioMax: number;
}

export const LTVCell: React.FC<LTVCellProps> = ({
                                                    loanRatioExternal,
                                                    loanRatioMax
                                                }) => {
    return (
        <div className={styles.ltvInfo}>
      <span className={styles.ltvValue}>
        {loanRatioExternal}%
      </span>
            <span className={styles.ltvMax}>
        (maks. {loanRatioMax}%)
      </span>
        </div>
    );
};

export default LTVCell;
