/* eslint-disable padding-line-between-statements */
import { useCallback, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Pagination, Spinner } from "@heroui/react";

import { queryParamUrl } from "../../../shared/utils/url-queryparam";
import { api } from "../../../shared/clients/api-client";

import { CommunitiesFormik } from "./communities-form";
import CommunityCard from "./community-card";

export default function CommunitiesList() {
  const { values: filters } = useFormikContext<CommunitiesFormik>();
  const [loading, setLoading] = useState(true);

  const [communities, setCommunities] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 10,
    itemsPerPage: 8,
  });

  const findCommunitiesByFilters = useCallback(
    async (page: number) => {
      const url = queryParamUrl("/communities?", {
        ...filters,
        limit: pagination.itemsPerPage,
        page: page,
      });

      try {
        const response = await api.get(url);
        setCommunities(response.data.data);
        setPagination((previousData) => ({
          ...previousData,
          total: response.data.total,
        }));
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  const handlePageChange = async (page: number) => {
    setPagination((previousData) => ({
      ...previousData,
      page: page,
    }));
    await findCommunitiesByFilters(page);
  };

  useEffect(() => {
    setLoading(true);
    setPagination((previousData) => ({
      ...previousData,
      page: 1,
    }));
    findCommunitiesByFilters(1);
  }, [filters]);

  return (
    <div className="mt-8 flex flex-col justify-between">
      {loading ? (
        <div className="mt-24 flex justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {communities.map((item, index) => (
            <CommunityCard
              key={`communities-${index}`}
              data={{
                description: item.description,
                image: item.image,
                name: item.name,
                slug: item.slug,
                tags: item.tags,
                city: item.city,
                state: item.state,
                totalMembers: item.totalMembers,
              }}
              filteredTag={filters.tag}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-12">
        <Pagination
          className={`${(loading || communities.length == 0) && "hidden"}`}
          page={pagination.page}
          total={Math.ceil(pagination.total / pagination.itemsPerPage)}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
