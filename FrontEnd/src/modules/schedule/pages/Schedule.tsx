import { Flex } from '@chakra-ui/react';
import { SearchBar } from 'shared/components/molecules/SearchBar/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import { ScheduleCard } from '../components/ScheduleCard/ScheduleCard';
import { useSchedule } from '../hooks/useSchedule';
import { useHandleSchedule } from '../handlers/schedule.handlers';

export const Schedule = () => {
  const { schedules, listSchedule, status } = useSchedule();
  const { handleSchedule } = useHandleSchedule();
  const [search, setSearch] = useState<string>('');

  const loadCategories = useCallback(
    (p = 1) => {
      listSchedule({ page: p });
    },
    [listSchedule]
  );

  const schedulesLowCase = search.toLowerCase();

  let filterSchedule;

  if (schedulesLowCase.length > 0) {
    filterSchedule = schedules.filter(
      sche =>
        (sche.title.toLowerCase().includes(schedulesLowCase) ||
        sche.place.toLowerCase().includes(schedulesLowCase)
    );
  } else filterSchedule = schedules;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <Flex gap="8px" flexDirection="column">
      <SearchBar
        placeholder="Pesquise por nome ou local da agenda"
        isSearching={status === 'searching'}
        defaultValue=""
        onChange={(e: string) => {
          setSearch(e);
        }}
      />
      {filterSchedule.map(schedule => (
        <ScheduleCard data={handleSchedule(schedule)} />
      ))}
    </Flex>
  );
};
