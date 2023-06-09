declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

type StatusStyle = {
  icon: string;
  text: string;
  color: string;
};

type StatusT = {
  [key: string]: StatusStyle;
};

type InternalCategoryT = {
  remote_name: string;
  displayed_name: string;
};

type CategoryT = {
  remote_name: string;
  displayed_name: string;
  items: InternalCategoryT[];
};

type ApiT = {
  endpoint: string;
  reportName: string;
  groupType: string;
  supergroupType: string;
};

type DowntimeT = {
  key?: string;
  service: string;
  hostname: string;
  start_time: string;
  end_time: string;
};

type DownTimeApiResponseT = {
  status: {
    message: string;
    code: string;
  };
  data: [
    {
      date: string;
      endpoints: Array<DowntimeT> | [];
    }
  ];
};

type StatusServiceGroupT = {
  groups: [
    {
      name: string;
      type: string;
      statuses: [
        {
          timestamp: string;
          value: number;
        }
      ];
    }
  ];
};

type ResultServiceGroupsT = {
  results: [
    {
      name: string;
      type: string;
      results: [
        {
          timestamp: string;
          availability: number;
          reliability: number;
        }
      ];
    }
  ];
};

type ResultServicesT = {
  results: [
    {
      name: string;
      type: string;
      endpoints: [
        {
          name: string;
          type: number;
          results: [
            {
              timestamp: string;
              availability: number;
              reliability: number;
              unknown: number;
              uptime: number;
              downtime: number;
            }
          ];
        }
      ];
    }
  ];
};

type ReportT = {
  status: {
    message: string;
    code: number;
  };
  data: [
    {
      id: string;
      tenant: string;
      disabled: boolean;
      info: {
        name: string;
        description: string;
        created: string;
        updated: string;
      };
      computations: {
        ar: boolean;
        status: boolean;
        trends: Array<string>;
      };
      thresholds: {
        availability: number;
        reliability: number;
        uptime: number;
        unknown: number;
        downtime: number;
      };
      topology_schema: {
        group: {
          type: string;
          group: {
            type: string;
          };
        };
      };
      profiles: [
        {
          id: string;
          name: string;
          type: string;
        },
        {
          id: string;
          name: string;
          type: string;
        },
        {
          id: string;
          name: string;
          type: string;
        }
      ];
      filter_tags: [
        {
          name: string;
          value: string;
          context: string;
        }
      ];
    }
  ];
};

type ThemeT = {
  "header-gradient-color-start": string;
  "header-gradient-color-end": string;
  "footer-gradient-color-start": string;
  "footer-gradient-color-end": string;
  "footer-copyright-text-color": string;
  logo: string;
};
