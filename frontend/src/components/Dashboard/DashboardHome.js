import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubmissions } from "../../store/submissions";
import { formatDate } from "../../utils";

export default function DashboardHome() {
  const dispatch = useDispatch();
  const submissions = useSelector((state) => state.submissions.submissions);

  useEffect(() => {
    dispatch(
      getSubmissions(
        new URLSearchParams({
          sortBy: "createdAt",
          order: "DESC",
          limit: 20,
          page: 1,
        })
      )
    );
  }, [dispatch]);

  return (
    <div>
      <h2 className="px-4 text-base font-semibold leading-7 text-black sm:px-6 lg:px-8">
        Latest Activity
      </h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-black/10 text-sm leading-6 text-black">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              User
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Form
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
            >
              Submitted
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {submissions?.map((submission) => (
            <tr key={submission.id}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 text-black">
                    {submission.User?.firstName} {submission.User?.lastName}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-black">
                    {submission.Form?.title}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 sm:table-cell sm:pr-6 lg:pr-8">
                <time dateTime={submission?.createdAt}>
                  {formatDate(submission?.createdAt)}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
