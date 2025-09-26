import React from 'react';
import Button from '@/components/common/Button/Button';
import type { ProjectStatusEnum } from '@/types/project.types';
import { PROJECT_STATUS_CONFIG } from '@/config/projectStatus.ts';
import styles from './ActionButtonCell.module.scss';

interface ActionButtonCellProps {
    status: ProjectStatusEnum;
    projectId: string;
    onAction?: (projectId: string) => void;
}

export const ActionButtonCell: React.FC<ActionButtonCellProps> = ({
                                                                      status,
                                                                      projectId,
                                                                      onAction
                                                                  }) => {
    const config = PROJECT_STATUS_CONFIG[status] || PROJECT_STATUS_CONFIG.open_for_investments;

    const handleClick = () => {
        if (!config.disabled && onAction) {
            onAction(projectId);
        }
    };

    return (
        <div className={`${styles.buttonWrapper} ${styles[config.className]}`}>
            <Button
                size="small"
                disabled={config.disabled}
                onClick={handleClick}
            >
                {config.text}
            </Button>
        </div>
    );
};

export default ActionButtonCell;
