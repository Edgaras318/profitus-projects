import React from 'react';
import styles from './ViewControls.module.scss';

interface ViewControlsProps {
    activeView?: 'list' | 'grid';
    onViewChange?: (view: 'list' | 'grid') => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({
    activeView = 'grid',
    onViewChange
}) => {
    return (
        <div className={styles.viewControls}>
            <button
                className={`${styles.viewButton} ${activeView === 'list' ? styles.active : ''}`}
                title="List View"
                onClick={() => onViewChange?.('list')}
            >
                <span>☰</span>
            </button>
            <button
                className={`${styles.viewButton} ${activeView === 'grid' ? styles.active : ''}`}
                title="Grid View"
                onClick={() => onViewChange?.('grid')}
            >
                <span>⚏</span>
            </button>
        </div>
    );
};

export default ViewControls;
