import React from 'react';
import styles from './ProjectsHeader.module.scss';

interface ProjectsHeaderProps {
    children: React.ReactNode;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ children }) => {
    return (
        <header className={styles.header}>
            <h1>Investavimo galimybės užtikrintos nekilnojamuoju turtu</h1>
            <div className={styles.headerControls}>
                {children}
            </div>
        </header>
    );
};

export default ProjectsHeader;
