import { useCallback } from 'react';
import {
  IListScheduleAPI,
  IListScheduleDTO,
} from 'modules/schedule/interfaces/dtos/schedule.list.dtos';
import { IScheduleRepository } from 'modules/schedule/repositories/IScheduleRepository';
import { useListScheduleUseCase } from './ListSchedule.useCase';
import { APIStatus } from 'shared/hooks/useApiStatus';
import { getListAPIStatus } from 'shared/utils/apis/getListAPIStatus';
import { ReplacePaginationFunction } from 'shared/hooks/usePagination';

type UseListScheduleController = {
  changeStatus: (status: APIStatus) => void;
  repository: IScheduleRepository;
  replacePagination: ReplacePaginationFunction;
};

export const useListScheduleController = ({
  repository,
  changeStatus,
  replacePagination,
}: UseListScheduleController) => {
  const { execute } = useListScheduleUseCase(repository);

  const handle = useCallback(
    async ({ page, search }: IListScheduleDTO) => {
      try {
        changeStatus(getListAPIStatus(page, search));
        const response = await execute({ page, search });

        const { meta } = response;

        replacePagination({
          page: meta.current_page,
          lastPage: meta.last_page,
        });

        changeStatus('listSuccess');

        return response;
      } catch (err) {
        console.log(err);
        changeStatus('error');
      }

      return {} as IListScheduleAPI;
    },
    [changeStatus, execute]
  );

  return { handle };
};
