import { useMemo } from "react";
import { dataService } from "@/services/data.service";
import type { Institution, Subject, SubjectQueryResult, SubjectDetailResult, StatisticsResult } from "@/services/data.service";

/**
 * Hook to fetch institution data with caching
 */
export function useInstitution(institutionId: string | undefined) {
  return useMemo(() => {
    if (!institutionId) return null;
    return dataService.getInstitutionById(institutionId);
  }, [institutionId]);
}

/**
 * Hook to fetch all institutions
 */
export function useInstitutions() {
  return useMemo(() => {
    return dataService.getAllInstitutions();
  }, []);
}

/**
 * Hook to fetch subjects by institution
 */
export function useSubjectsByInstitution(institutionId: string | undefined): SubjectQueryResult {
  return useMemo(() => {
    if (!institutionId) return { institution: null, groups: [] };
    return dataService.getSubjectsByInstitution(institutionId);
  }, [institutionId]);
}

/**
 * Hook to find a specific subject
 */
export function useSubjectDetail(institutionId: string | undefined, subjectId: string | undefined): SubjectDetailResult {
  return useMemo(() => {
    if (!institutionId || !subjectId) return { subject: null, group: null };
    return dataService.findSubject(institutionId, subjectId);
  }, [institutionId, subjectId]);
}

/**
 * Hook to get statistics
 */
export function useDataStatistics(): StatisticsResult {
  return useMemo(() => {
    return dataService.getStatistics();
  }, []);
}