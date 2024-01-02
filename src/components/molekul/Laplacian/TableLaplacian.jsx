import { Katex } from '../../atoms';

const TableLaplacian = () => {
  return (
    <div className="row robert-table">
      <div className="col-xl-4">
        <table className="table table-bordered robert-table text-center">
          <tbody>
            <tr>
              <td className="rm-top-border rm-left-border rm-right-border"></td>
              <td className="rm-top-border rm-left-border rm-right-border">
                <Katex mathExpression="x-1" />
              </td>
              <td className="rm-top-border rm-left-border rm-right-border">
                <Katex mathExpression="x" />
              </td>
              <td className="rm-top-border rm-left-border rm-right-border">
                <Katex mathExpression="x+1" />
              </td>
            </tr>
            <tr>
              <td className="rm-top-border rm-left-border">
                <Katex mathExpression="y-1" />
              </td>
              <td>
                <Katex mathExpression="z_1" />
              </td>
              <td>
                <Katex mathExpression="z_2" />
              </td>
              <td>
                <Katex mathExpression="z_3" />
              </td>
            </tr>
            <tr>
              <td className="rm-top-border rm-bottom-border rm-left-border">
                <Katex mathExpression="y" />
              </td>
              <td>
                <Katex mathExpression="z_4" />
              </td>
              <td>
                <Katex mathExpression="z_5" />
              </td>
              <td>
                <Katex mathExpression="z_6" />
              </td>
            </tr>
            <tr>
              <td className="rm-top-border rm-bottom-border rm-left-border">
                <Katex mathExpression="y+1" />
              </td>
              <td>
                <Katex mathExpression="z_7" />
              </td>
              <td>
                <Katex mathExpression="z_8" />
              </td>
              <td>
                <Katex mathExpression="z_9" />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-center">
          Posisi pada citra <Katex mathExpression="f" />
        </p>
      </div>
      <div className="col-xl-4">
        <table className="table table-bordered robert-table text-center gx-table">
          <tbody>
            <tr>
              <td>
                <Katex mathExpression="0" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="0" />
              </td>
            </tr>
            <tr>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="4" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
            </tr>
            <tr>
              <td>
                <Katex mathExpression="0" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="0" />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-center">
          <Katex mathExpression="g_x" />
        </p>
      </div>
      <div className="col-xl-4">
        <table className="table table-bordered robert-table text-center gy-table">
          <tbody>
            <tr>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
            </tr>
            <tr>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="8" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
            </tr>
            <tr>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
              <td>
                <Katex mathExpression="-1" />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-center">
          <Katex mathExpression="g_y" />
        </p>
      </div>
    </div>
  );
};

export default TableLaplacian;
