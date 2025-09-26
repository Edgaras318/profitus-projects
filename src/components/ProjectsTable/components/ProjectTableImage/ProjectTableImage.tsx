import React from 'react';
import SecurityBadge from '@/components/common/SecurityBadge/SecurityBadge';
import type { ProjectStatusEnum, SecurityMeasuresEnum } from '@/types/project.types';
import { PROJECT_STATUS_CONFIG } from '@/config/projectStatus.ts';
import styles from './ProjectTableImage.module.scss';

interface ProjectTableImageProps {
    imageUrl?: string;
    projectName: string;
    securityMeasure: SecurityMeasuresEnum;
    status: ProjectStatusEnum;
}

export const ProjectTableImage: React.FC<ProjectTableImageProps> = ({
                                                                        imageUrl,
                                                                        projectName,
                                                                        securityMeasure,
                                                                        status
                                                                    }) => {
    const statusConfig = PROJECT_STATUS_CONFIG[status];

    return (
        <div className={styles.imageContainer}>
            {imageUrl && (
                <div className={styles.imageWrapper}>
                    <img
                        src={imageUrl}
                        alt={projectName}
                        className={styles.projectImage}
                    />
                    <SecurityBadge
                        securityMeasure={securityMeasure}
                        className={styles.badgeInside}
                    />
                    {statusConfig?.showOverlay && (
                        <div className={styles.fundedOverlay}>
              <span className={styles.overlayText}>
                {statusConfig.overlayText}
              </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectTableImage;
