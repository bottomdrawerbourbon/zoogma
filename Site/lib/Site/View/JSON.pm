package Site::View::JSON;

use strict;
use base 'Catalyst::View::JSON';

use JSON::XS;

sub process {
    my ( $self, $c ) = @_;

    $c->log->debug("In the process of JSON..");
    # Set the header content-type for JSON
    $c->response->headers->header('Content-Type' => 'application/json');

    my $data = $c->stash->{data};
    use Data::Dumper; warn Dumper($data);
    my $output;
    eval {
        my $encoder = JSON::XS->new->pretty(1)->convert_blessed(1);
        $output = $self->serialize( $c, $data, $encoder);
    };
    if( $@ ) {
        warn "Got $@";
        return $@;
    }

    # Add JSONP feature. Wrap the outgoing XML in a function call
    if( $c->stash->{do_jsonp} ) {
        $output = $c->stash->{do_jsonp} . "($output);";
    }

    use Data::Dumper; warn Dumper($output);
    $c->response->body( $output );
    return 1;  # important
}
sub serialize {
    my ( $self, $c, $data, $encoder ) = @_;
    my $serialized = $encoder->encode($data);
    return $serialized;
}


1;
