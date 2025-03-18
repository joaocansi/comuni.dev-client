import { SVGProps } from "react";

import { authClient } from "../shared/clients/auth-client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Session = typeof authClient.$Infer.Session;

export type Community = {
  name: string;
  description: string;
  image: string;
  owner: {
    name: string;
    image: string;
  };
  tags: string[];
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginationOptions<Filter> = {
  page: number;
  limit: number;
  filters?: Filter;
};
